from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import inspect, create_engine # for creating the db connection
from sqlalchemy.orm import sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String, Numeric # define table columns

Base = declarative_base() # Base class for models (blueprint for db models)

# Database connection
# Format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# Session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# 'Product' model
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    price = Column(Numeric(10, 2))

# product_orange = Product(name="Orange", price=10.55)
# session.add(product_orange)
# session.commit()
# session.refresh(product_orange)

# Create tables (runs CREATE TABLE if non-existing)
Base.metadata.create_all(bind=engine)

# Display tables
inspector = inspect(engine)
tables = inspector.get_table_names()
print(tables)

# Query users
# users = session.query(Product).all()
# for u in users:
#     print(u.id, u.name, u.price)