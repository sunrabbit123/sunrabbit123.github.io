#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * Translate MDX content using Anthropic Claude API
 * @param {string} content - The content to translate
 * @param {string} apiKey - The API key for authentication
 * @returns {Promise<string>} The translated content
 */
async function translateWithClaude(content, apiKey) {
  const systemPrompt = `You are a professional technical translator specializing in software engineering content.
Translate the following Korean blog post content to English while:
1. Preserving all markdown formatting exactly (##, -, *, \`, etc.)
2. Keeping code blocks, URLs, and image paths unchanged
3. Using natural, professional English suitable for a tech blog
4. Translating technical terms consistently
5. Maintaining the original structure and formatting

IMPORTANT: Return ONLY the translated content without any additional explanation or markdown code fences.`;

  const userPrompt = `Translate this Korean text to English:\n\n${content}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.content[0].text.trim();
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

/**
 * Translate MDX content using OpenAI GPT-4 API (fallback option)
 * @param {string} content - The content to translate
 * @param {string} apiKey - The API key for authentication
 * @returns {Promise<string>} The translated content
 */
async function translateWithOpenAI(content, apiKey) {
  const systemPrompt = `You are a professional technical translator specializing in software engineering content.
Translate Korean blog posts to English while:
1. Preserving all markdown formatting exactly (##, -, *, \`, etc.)
2. Keeping code blocks, URLs, and image paths unchanged
3. Using natural, professional English suitable for a tech blog
4. Translating technical terms consistently
5. Maintaining the original structure and formatting

Return ONLY the translated content without any additional explanation.`;

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
          {
            role: 'user',
            content: `Translate this Korean text to English:\n\n${content}`
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
}

/**
 * Translate frontmatter fields that should be translated
 * @param {object} frontmatter - The frontmatter object
 * @param {string} translatedContent - The translated content (used for context)
 * @returns {object} The frontmatter with translated fields
 */
function translateFrontmatter(frontmatter, translatedContent) {
  const translated = { ...frontmatter };

  // Fields that should be translated - we'll extract from translated content
  // For now, we'll keep frontmatter as-is to avoid additional API calls
  // In production, you might want to translate title and excerpt separately

  return translated;
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

  // Determine which API to use
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  let translatedContent;

  try {
    if (anthropicKey) {
      console.log('Using Anthropic Claude API for translation...');
      translatedContent = await translateWithClaude(content, anthropicKey);
    } else if (openaiKey) {
      console.log('Using OpenAI GPT-4 API for translation...');
      translatedContent = await translateWithOpenAI(content, openaiKey);
    } else {
      throw new Error('No API key found. Please set ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable.');
    }

    // Translate frontmatter fields
    const translatedFrontmatter = translateFrontmatter(frontmatter, translatedContent);

    // Reconstruct the MDX file
    const outputContent = matter.stringify(translatedContent, translatedFrontmatter);

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

module.exports = { translateMDXFile, translateWithClaude, translateWithOpenAI };
