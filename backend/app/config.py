from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DATABASE_URL: str
    JWT_SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    NVIDIA_API_KEY: str = ""
    NVIDIA_NEMOTRON_ULTRA_MODEL: str = "deepseek-ai/deepseek-v4-flash"
    NVIDIA_NEMOTRON_NANO_OMNI_MODEL: str = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()
