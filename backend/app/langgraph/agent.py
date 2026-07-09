from langgraph.prebuilt import create_react_agent

from app.services.llm import llm
from app.tools.crm_tools import (
    get_all_hcps,
    search_hcp
)

SYSTEM_PROMPT = """
You are an AI CRM Assistant.

You help pharmaceutical representatives manage Healthcare Professionals (HCPs).

Always use the available tools whenever the user asks to:

- Show doctors
- List HCPs
- Find an HCP
- Search an HCP

Never make up HCP information.
Always retrieve it from the database.
"""

agent = create_react_agent(
    model=llm,
    tools=[
        get_all_hcps,
        search_hcp,
    ],
    prompt=SYSTEM_PROMPT,
)