from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.hcp import HCP
from app.schemas.hcp import HCPCreate, HCPResponse

router = APIRouter(
    prefix="/api/hcps",
    tags=["HCP"]
)


# Create Doctor
@router.post("/", response_model=HCPResponse)
def create_hcp(
    hcp: HCPCreate,
    db: Session = Depends(get_db)
):
    new_hcp = HCP(
        name=hcp.name,
        specialization=hcp.specialization,
        hospital=hcp.hospital,
        location=hcp.location,
        phone=hcp.phone,
        email=hcp.email,
        notes=hcp.notes,
    )

    db.add(new_hcp)
    db.commit()
    db.refresh(new_hcp)

    return new_hcp


# Get All Doctors
@router.get("/", response_model=list[HCPResponse])
def get_hcps(
    db: Session = Depends(get_db)
):
    return db.query(HCP).all()


# Delete Doctor
@router.delete("/{hcp_id}")
def delete_hcp(
    hcp_id: int,
    db: Session = Depends(get_db)
):
    hcp = db.query(HCP).filter(HCP.id == hcp_id).first()

    if not hcp:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    db.delete(hcp)
    db.commit()

    return {
        "message": "Doctor deleted successfully"
    }