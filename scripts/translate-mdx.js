#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Parse the structured JSON response from OpenAI
 * @param {string} responseText - The response text from OpenAI API
 * @returns {object} Parsed translation result with content and frontmatter
 */
function parseTranslationResponse(responseText) {
  try {
    // Try to parse as JSON first
    const parsed = JSON.parse(responseText);

    // Validate the expected structure
    if (!parsed.translatedContent) {
      throw new Error('Response missing translatedContent field');
    }

    return {
      content: parsed.translatedContent,
      frontmatter: parsed.translatedFrontmatter || {}
    };
  } catch (error) {
    // If JSON parsing fails, try to extract JSON from markdown code blocks
    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        return {
          content: parsed.translatedContent,
          frontmatter: parsed.translatedFrontmatter || {}
        };
      } catch (e) {
        // Fall through to error
      }
    }

    throw new Error(`Failed to parse translation response: ${error.message}`);
  }
}

/**
 * Translate MDX content using OpenAI GPT-4 API with structured output
 * @param {string} content - The content to translate
 * @param {object} frontmatter - The frontmatter object to translate
 * @param {string} apiKey - The API key for authentication
 * @returns {Promise<object>} The translated content and frontmatter
 */
async function translateWithOpenAI(content, frontmatter, apiKey) {
  const systemPrompt = `You are a professional technical translator specializing in software engineering content.
Translate Korean blog posts to English while:
1. Preserving all markdown formatting exactly (##, -, *, \`\`\`, etc.)
2. Keeping code blocks, URLs, and image paths unchanged
3. Using natural, professional English suitable for a tech blog
4. Translating technical terms consistently
5. Maintaining the original structure and formatting

You MUST respond with a JSON object in the following format:
{
  "translatedContent": "...translated markdown content here...",
  "translatedFrontmatter": {
    "title": "...translated title...",
    "excerpt": "...translated excerpt...",
    ...other frontmatter fields...
  }
}

IMPORTANT: Return ONLY valid JSON without any markdown code fences or additional explanation.`;

  // Few-shot examples to guide the model
  const fewShotExamples = [
    {
      role: 'user',
      content: `Translate this Korean blog post:

Frontmatter:
${JSON.stringify({
  title: "리액트 훅스 시작하기",
  excerpt: "리액트 훅스의 기본 개념과 사용법을 알아봅니다.",
  date: "2024-01-15",
  category: "React"
}, null, 2)}

Content:
## 소개

리액트 훅스는 함수형 컴포넌트에서 상태와 라이프사이클을 사용할 수 있게 해줍니다.

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## 결론

훅스를 사용하면 코드가 더 간결해집니다.`
    },
    {
      role: 'assistant',
      content: JSON.stringify({
        translatedContent: `## Introduction

React Hooks enable you to use state and lifecycle in functional components.

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## Conclusion

Using hooks makes your code more concise.`,
        translatedFrontmatter: {
          title: "Getting Started with React Hooks",
          excerpt: "Learn the basic concepts and usage of React Hooks.",
          date: "2024-01-15",
          category: "React"
        }
      }, null, 2)
    },
    {
      role: 'user',
      content: `Translate this Korean blog post:

Frontmatter:
${JSON.stringify({
  title: "타입스크립트 제네릭",
  excerpt: "제네릭을 사용한 타입 안전성 향상",
  date: "2024-02-20",
  tags: ["typescript", "generics"]
}, null, 2)}

Content:
## 제네릭이란?

제네릭은 재사용 가능한 컴포넌트를 만들 때 사용됩니다.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

이렇게 사용하면 타입 안전성을 유지할 수 있습니다.`
    },
    {
      role: 'assistant',
      content: JSON.stringify({
        translatedContent: `## What are Generics?

Generics are used when creating reusable components.

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\`

Using this approach maintains type safety.`,
        translatedFrontmatter: {
          title: "TypeScript Generics",
          excerpt: "Improving type safety with generics",
          date: "2024-02-20",
          tags: ["typescript", "generics"]
        }
      }, null, 2)
    }
  ];

  const userPrompt = `Translate this Korean blog post:

Frontmatter:
${JSON.stringify(frontmatter, null, 2)}

Content:
${content}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...fewShotExamples,
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content.trim();

    // Parse the structured response
    return parseTranslationResponse(responseText);
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}


/**
 * Main translation function
 * @param {string} filePath - Path to the MDX file to translate
 */
async function translateMDXFile(filePath) {
  console.log(`\nProcessing: ${filePath}`);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }

  // Check if it's already an English file
  if (filePath.endsWith('.en.mdx')) {
    console.log('Skipping: File is already an English translation');
    return;
  }

  // Generate output filename
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, '.mdx');
  const outputPath = path.join(dir, `${basename}.en.mdx`);

  // Check if translation already exists and is newer
  if (fs.existsSync(outputPath)) {
    const sourceStats = fs.statSync(filePath);
    const outputStats = fs.statSync(outputPath);
    if (outputStats.mtime > sourceStats.mtime) {
      console.log('Skipping: Translation exists and is newer than source');
      return;
    }
    console.log('Translation exists but is older than source, will update...');
  }

  // Read and parse the MDX file
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  console.log('Frontmatter:', JSON.stringify(frontmatter, null, 2));
  console.log(`Content length: ${content.length} characters`);

  // Get OpenAI API key
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!openaiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set');
  }

  try {
    console.log('Using OpenAI GPT-4 API for translation...');

    // Translate both content and frontmatter
    const translation = await translateWithOpenAI(content, frontmatter, openaiKey);

    // Merge translated frontmatter with original (keeping fields that shouldn't be translated)
    const finalFrontmatter = {
      ...frontmatter,
      ...translation.frontmatter
    };

    // Reconstruct the MDX file
    const outputContent = matter.stringify(translation.content, finalFrontmatter);

    // Write the translated file
    fs.writeFileSync(outputPath, outputContent, 'utf8');
    console.log(`✓ Translation completed: ${outputPath}`);

    // Return success
    return {
      success: true,
      input: filePath,
      output: outputPath
    };
  } catch (error) {
    console.error(`✗ Translation failed for ${filePath}:`, error.message);

    // Don't throw - let the workflow continue with other files
    return {
      success: false,
      input: filePath,
      error: error.message
    };
  }
}

/**
 * Retry wrapper with exponential backoff
 * @param {Function} fn - The function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      const waitTime = delay * Math.pow(2, i);
      console.log(`Retry ${i + 1}/${maxRetries} after ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node translate-mdx.js <file1.mdx> [file2.mdx] ...');
    process.exit(1);
  }

  console.log('=== MDX Translation Tool ===');
  console.log(`Files to process: ${args.length}`);

  const results = [];

  for (const filePath of args) {
    try {
      const result = await retryWithBackoff(() => translateMDXFile(filePath));
      results.push(result);
    } catch (error) {
      console.error(`Failed to process ${filePath} after retries:`, error.message);
      results.push({
        success: false,
        input: filePath,
        error: error.message
      });
    }
  }

  // Summary
  console.log('\n=== Translation Summary ===');
  const successful = results.filter(r => r && r.success).length;
  const failed = results.filter(r => r && !r.success).length;
  console.log(`Successful: ${successful}`);
  console.log(`Failed: ${failed}`);

  if (failed > 0) {
    console.log('\nFailed files:');
    results
      .filter(r => r && !r.success)
      .forEach(r => console.log(`  - ${r.input}: ${r.error}`));
  }

  // Exit with error code if any translations failed
  process.exit(failed > 0 ? 1 : 0);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { translateMDXFile, translateWithOpenAI, parseTranslationResponse };
