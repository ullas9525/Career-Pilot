from openai import AsyncOpenAI
from app.config import settings

NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1"

NEMOTRON_3_ULTRA = settings.NVIDIA_NEMOTRON_ULTRA_MODEL
NEMOTRON_3_NANO_OMNI = settings.NVIDIA_NEMOTRON_NANO_OMNI_MODEL


def get_client(api_key: str | None = None):
    return AsyncOpenAI(
        api_key=api_key or settings.NVIDIA_API_KEY,
        base_url=NVIDIA_BASE_URL,
        timeout=120.0,
    )


async def chat_completion(
    messages: list[dict],
    model: str = NEMOTRON_3_NANO_OMNI,
    temperature: float = 0.7,
    response_format: dict | None = None,
    api_key: str | None = None,
    max_tokens: int | None = None,
) -> str:
    client = get_client(api_key)
    kwargs = {
        "messages": messages,
        "model": model,
        "temperature": temperature,
    }
    if response_format:
        kwargs["response_format"] = response_format
    if max_tokens:
        kwargs["max_tokens"] = max_tokens

    completion = await client.chat.completions.create(**kwargs)
    return completion.choices[0].message.content
