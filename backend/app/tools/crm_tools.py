from langchain_core.tools import tool
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.hcp import HCP


@tool
def get_all_hcps() -> list:
    """Return all healthcare professionals."""

    db: Session = SessionLocal()

    hcps = db.query(HCP).all()

    db.close()

    return [
        {
            "id": h.id,
            "name": h.name,
            "specialization": h.specialization,
            "hospital": h.hospital,
            "location": h.location,
        }
        for h in hcps
    ]


@tool
def search_hcp(name: str):
    """Search a healthcare professional by name."""

    db: Session = SessionLocal()

    hcp = (
        db.query(HCP)
        .filter(HCP.name.ilike(f"%{name}%"))
        .first()
    )

    db.close()

    if hcp:
        return {
            "id": hcp.id,
            "name": hcp.name,
            "specialization": hcp.specialization,
            "hospital": hcp.hospital,
            "location": hcp.location,
        }

    return "No healthcare professional found."