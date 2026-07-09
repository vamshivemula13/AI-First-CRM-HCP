from app.db.database import engine, Base
from app.models.hcp import HCP


def create_tables():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    create_tables()
    print("Database tables created successfully")