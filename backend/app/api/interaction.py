from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.interaction import Interaction
from app.schemas.interaction import (
    InteractionCreate,
    InteractionResponse
)


router = APIRouter(
    prefix="/api/interactions",
    tags=["Interactions"]
)


# -----------------------------
# Create Interaction
# -----------------------------
@router.post("/", response_model=InteractionResponse)
def create_interaction(
    interaction: InteractionCreate,
    db: Session = Depends(get_db)
):

    new_interaction = Interaction(
        hcp_id=interaction.hcp_id,
        interaction_type=interaction.interaction_type,
        summary=interaction.summary,
        follow_up_date=interaction.follow_up_date,
        status="Pending"
    )

    db.add(new_interaction)
    db.commit()
    db.refresh(new_interaction)

    return new_interaction



# -----------------------------
# Get All Interactions
# -----------------------------
@router.get("/", response_model=list[InteractionResponse])
def get_all_interactions(
    db: Session = Depends(get_db)
):

    return db.query(Interaction).all()



# -----------------------------
# Get Interaction History
# -----------------------------
@router.get(
    "/history/{hcp_id}",
    response_model=list[InteractionResponse]
)
def get_hcp_interactions(
    hcp_id: int,
    db: Session = Depends(get_db)
):

    interactions = (
        db.query(Interaction)
        .filter(Interaction.hcp_id == hcp_id)
        .all()
    )

    return interactions



# -----------------------------
# Get Upcoming Follow-ups
# -----------------------------
@router.get("/followups/")
def get_followups(
    db: Session = Depends(get_db)
):

    followups = (
        db.query(Interaction)
        .filter(
            Interaction.follow_up_date >= str(date.today())
        )
        .order_by(Interaction.follow_up_date)
        .all()
    )

    return followups



# -----------------------------
# Update Interaction Status
# -----------------------------
@router.put("/{interaction_id}/status")
def update_status(
    interaction_id: int,
    status: str,
    db: Session = Depends(get_db)
):

    interaction = (
        db.query(Interaction)
        .filter(Interaction.id == interaction_id)
        .first()
    )


    if not interaction:
        raise HTTPException(
            status_code=404,
            detail="Interaction not found"
        )


    if status not in ["Pending", "Completed"]:
        raise HTTPException(
            status_code=400,
            detail="Status must be Pending or Completed"
        )


    interaction.status = status

    db.commit()
    db.refresh(interaction)


    return {
        "message": "Status updated successfully",
        "status": interaction.status
    }