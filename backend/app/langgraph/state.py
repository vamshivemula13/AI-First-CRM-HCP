from typing import TypedDict
from langchain_core.messages import BaseMessage


class CRMState(TypedDict):
    messages: list[BaseMessage]