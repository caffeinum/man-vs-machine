import asyncio
from claude_code_sdk import ClaudeSDKClient, ClaudeCodeOptions

async def summarize_issue(repo_name: str, issue_number: str): 
    prompt = """
    You are a summarizer. You will be provided with an issue and your task is to summarize 
    what the issue is, what files is or will be affected. 

    """

    async with ClaudeSDKClient(
        options=ClaudeCodeOptions(
            system_prompt=prompt,
            allowed_tools=["Bash", "Read", "WebSearch"],
            max_turns=5
        )
    ) as client:
        query = f"""Analyze the given github issue #{issue_number} in the {repo_name} repository
        Summarize the content in less than 200 words"""
        await client.query(query)
        async for message in client.receive_response():
            if hasattr(message, 'content'):
                for block in message.content:
                    if hasattr(block, 'text'):
                        print(block.text, end='', flush=True)

# Run as script
asyncio.run(summarize_issue("firecrawl/firecrawl", "90"))

# Or in IPython/Jupyter: await main()