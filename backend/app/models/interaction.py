from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.db.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    hcp_id = Column(
        Integer,
        ForeignKey("hcps.id"),
        nullable=False
    )

    interaction_type = Column(
        String(50),
        nullable=False
    )

    summary = Column(
        Text,
        nullable=False
    )

    follow_up_date = Column(
        String(50),
        nullable=True
    )

    status = Column(
        String(20),
        nullable=False,
        default="Pending"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )