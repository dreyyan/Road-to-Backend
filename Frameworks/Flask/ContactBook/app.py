from flask import Flask, render_template, request
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# ROUTES: Main
@app.route("/")
def home():
    return render_template("index.html")  # Flask looks inside /templates/

@app.route("/add_contact")
def add_contact():
    return render_template("add_contact.html")

@app.route("/remove_contact")
def remove_contact():
    return render_template("remove_contact.html")

@app.route("/view_contact_list")
def view_contact_list():
    return render_template("view_contact_list.html")

@app.route("/settings")
def settings():
    return render_template("settings.html")

# VALIDATION
def validate_name(name: str):
    if not name or not name.strip():
        return "ERROR: Name cannot be empty"        
    return None

def validate_address(address: str):
    if not address or not address.strip():
        return "ERROR: Address cannot be empty"        
    return None

def validate_contact_number(contact_number: str):
    if not contact_number or not contact_number.strip():
        return "ERROR: Contact number cannot be empty"        
    return None

def validate_email_address(email_address: str):
    if not email_address or not email_address.strip():
        return "ERROR: Email address cannot be empty"        
    return None

def validate_input(name: str, address: str, contact_number: str, email_address: str):
    errors = []

    # validate each field and add errors if any
    for validator, value in [
        (validate_name, name),
        (validate_address, address),
        (validate_contact_number, contact_number),
        (validate_email_address, email_address)
    ]:
        error = validator(value)
        if error:
            errors.append(error)

    return errors

@app.route("/add_contact_form", methods=["POST"])
def add_to_contacts():
    conn = None
    try:
        # connect to MySQL
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="123098239838",
            database="contacts"
        )

        cursor = conn.cursor()

        # create table if it doesn't exist
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            contact_number VARCHAR(20),
            email_address VARCHAR(255)
        )
        """)

        # insert data
        cursor.execute("""
        INSERT INTO contacts (name, address, contact_number, email_address)
        VALUES (%s, %s, %s, %s)
        """, (name, address, contact_number, email_address))

        conn.commit()

    except Error as e:
        # show error in browser instead of crashing
        return f"MySQL Error: {e}"

    finally:
        if conn and conn.is_connected():
            cursor.close()
            conn.close()
     
    # if no errors, you can save the contact or show a success page
    return f"Contact {name} added successfully!"

if __name__ == "__main__":
    app.run(debug=True)