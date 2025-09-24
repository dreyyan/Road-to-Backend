from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import create_engine # for creating the db connection
from sqlalchemy.orm import Session, sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String # define table columns

Base = declarative_base() # Base class for models (blueprint for db models)

# Database connection
# Format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# Session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# 'User' model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)

# Update user email
def update_user_email(db: Session, user_id: int, new_email: str):
    # Fetch user
    user = db.query(User).filter(User.id == user_id).first()
    
    if user:
        user.email = new_email  # update field
        db.commit()             # save changes
        db.refresh(user)        # refresh from DB
    return user

# Example usage
with SessionLocal() as session:
    # Update
    updated_user = update_user_email(session, 1, "newmail@example.com")
    if updated_user:
        print("Updated:", updated_user.id, updated_user.email)

    # Query all
    users = session.query(User).all()
    for u in users:
        print(u.id, u.email)