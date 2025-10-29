# Auto-Translation Workflow

This document describes the automatic blog post translation workflow that translates Korean MDX blog posts to English.

## Overview

The auto-translation workflow automatically detects when Korean MDX blog posts are added or modified in the `content/posts/` directory, translates them to English using an LLM API (Anthropic Claude or OpenAI GPT-4), and creates corresponding English versions with the `.en.mdx` extension.

## Features

- **Automatic Detection**: Monitors changes to `*.mdx` files in `content/posts/`
- **Smart Translation**: Uses AI (Claude or GPT-4) to translate technical content accurately
- **Frontmatter Preservation**: Maintains YAML frontmatter structure
- **Markdown Formatting**: Preserves all markdown syntax (code blocks, links, images, lists)
- **Automatic Commits**: Translated files are automatically committed to the repository
- **Error Handling**: Gracefully handles API failures and rate limits
- **Skip Duplicates**: Avoids re-translating files that are already up-to-date

## Setup

### 1. Configure API Keys

You need to set up at least one of the following API keys as a GitHub repository secret:

#### Option A: Anthropic Claude API (Recommended)

1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Go to your GitHub repository → Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `ANTHROPIC_API_KEY`
5. Value: Your Anthropic API key
6. Click "Add secret"

#### Option B: OpenAI GPT-4 API (Alternative)

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Go to your GitHub repository → Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `OPENAI_API_KEY`
5. Value: Your OpenAI API key
6. Click "Add secret"

**Note**: If both keys are set, the workflow will prefer Anthropic Claude API.

### 2. Enable Workflow Permissions

Ensure GitHub Actions has write permissions:

1. Go to your GitHub repository → Settings → Actions → General
2. Scroll to "Workflow permissions"
3. Select "Read and write permissions"
4. Check "Allow GitHub Actions to create and approve pull requests"
5. Click "Save"

## How It Works

### Workflow Trigger

The workflow triggers automatically when:
- Files matching `content/posts/**/*.mdx` are pushed to the `main` branch
- Excludes files that already end with `.en.mdx`

You can also trigger it manually:
1. Go to Actions tab in GitHub
2. Select "Auto-Translate Korean Blog Posts"
3. Click "Run workflow"

### Translation Process

1. **File Detection**: Identifies which MDX files were changed
2. **Content Parsing**: Extracts frontmatter and content using `gray-matter`
3. **AI Translation**: Sends content to Claude or GPT-4 API with a specialized prompt
4. **File Generation**: Creates `.en.mdx` file with translated content
5. **Git Commit**: Automatically commits and pushes translations

### File Naming Convention

- Original Korean file: `content/posts/example.mdx`
- English translation: `content/posts/example.en.mdx`

This allows your i18n system to identify language variants.

## Translation Script

The core translation logic is in `scripts/translate-mdx.js`. This script:

- Reads MDX files and parses frontmatter
- Calls the appropriate LLM API (Claude or GPT-4)
- Preserves markdown formatting and code blocks
- Handles errors with retry logic and exponential backoff
- Skips files that are already translated and up-to-date

### Manual Usage

You can run the translation script manually:

```bash
# Translate a single file
node scripts/translate-mdx.js content/posts/my-post.mdx

# Translate multiple files
node scripts/translate-mdx.js content/posts/post1.mdx content/posts/post2.mdx

# Set API key via environment variable
ANTHROPIC_API_KEY=your-key node scripts/translate-mdx.js content/posts/my-post.mdx
```

## Translation Quality

The translation system uses specialized prompts that ensure:

1. **Technical Accuracy**: Proper translation of software engineering terminology
2. **Formatting Preservation**: All markdown syntax remains intact
3. **Code Block Safety**: Code samples are never modified
4. **URL Preservation**: Links and image paths stay unchanged
5. **Natural English**: Professional, native-sounding output

### Translation Prompt

The system uses this prompt strategy:

```
You are a professional technical translator specializing in software engineering content.
Translate the following Korean blog post to English while:
1. Preserving all markdown formatting exactly (##, -, *, `, etc.)
2. Keeping code blocks, URLs, and image paths unchanged
3. Using natural, professional English suitable for a tech blog
4. Translating technical terms consistently
5. Maintaining the original structure and formatting
```

## Limitations and Known Issues

### Current Limitations

1. **One-way translation**: Only Korean → English (not bidirectional)
2. **Frontmatter**: Title and excerpt are kept in original language to avoid extra API calls
3. **New files only**: Doesn't retroactively translate existing files
4. **API costs**: Each translation uses API tokens (monitor your usage)

### Future Improvements

- [ ] Translate frontmatter fields (title, excerpt)
- [ ] Support manual review workflow before commit
- [ ] Add support for other languages
- [ ] Implement translation quality checks
- [ ] Add cost estimation and limits

## Troubleshooting

### Workflow Not Triggering

**Problem**: Changes to MDX files don't trigger the workflow

**Solutions**:
- Ensure files are in `content/posts/` directory
- Check that files have `.mdx` extension (not `.en.mdx`)
- Verify the workflow file is in `.github/workflows/`
- Check GitHub Actions is enabled for your repository

### API Errors

**Problem**: Translation fails with API errors

**Solutions**:
- Verify API key is correctly set in repository secrets
- Check API key has sufficient credits/quota
- Review API rate limits
- Check the Actions logs for specific error messages

### Permission Errors

**Problem**: Workflow can't commit files

**Solutions**:
- Enable "Read and write permissions" in repository settings
- Ensure Actions can create commits
- Check branch protection rules aren't blocking Actions

### Translation Quality Issues

**Problem**: Translations are inaccurate or malformed

**Solutions**:
- Review the source MDX for unusual formatting
- Check if code blocks are properly fenced
- Verify frontmatter YAML is valid
- Consider adjusting the translation prompt in `translate-mdx.js`

## Cost Estimation

### Anthropic Claude API

- Model: `claude-3-5-sonnet-20241022`
- Approximate cost: $3 per million input tokens, $15 per million output tokens
- Average blog post: ~2,000 input tokens + ~2,000 output tokens ≈ $0.04 per post

### OpenAI GPT-4 API

- Model: `gpt-4-turbo-preview`
- Approximate cost: $10 per million input tokens, $30 per million output tokens
- Average blog post: ~2,000 input tokens + ~2,000 output tokens ≈ $0.08 per post

**Note**: Costs may vary based on content length and API pricing changes.

## Examples

### Example: Adding a New Korean Blog Post

1. Create a new file: `content/posts/my-new-post.mdx`
2. Write your content in Korean with proper frontmatter
3. Commit and push to `main` branch
4. The workflow automatically runs and creates `content/posts/my-new-post.en.mdx`
5. The English version is committed to the repository

### Example: Updating an Existing Post

1. Edit `content/posts/existing-post.mdx`
2. Commit and push changes
3. The workflow detects the modification
4. Updates `content/posts/existing-post.en.mdx` with new translation
5. The updated translation is committed

## Monitoring

### Check Workflow Status

1. Go to the Actions tab in GitHub
2. Look for "Auto-Translate Korean Blog Posts" workflow
3. Click on individual runs to see details
4. Review the "Translation Summary" for results

### Logs

Each workflow run provides:
- List of changed files detected
- Translation progress for each file
- Success/failure status
- Summary of generated translations

## Contributing

To improve the translation workflow:

1. Test changes to `scripts/translate-mdx.js` locally first
2. Update this documentation if adding new features
3. Consider API costs when making changes
4. Add error handling for edge cases

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [OpenAI API](https://platform.openai.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [gray-matter](https://github.com/jonschlinkert/gray-matter)
