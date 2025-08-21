from flask import Flask, render_template, request

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


# ROUTES: Form
@app.route("/add_contact_form", methods=["POST"])
def add_to_contacts():
    # get form inputs
    name = request.form.get("name_input")
    address = request.form.get("address_input")
    contact_number = request.form.get("contact_number_input")
    email_address = request.form.get("email_address_input")

    # validate user input
    errors = validate_input(name, address, contact_number, email_address)

    if errors:
        # if there are errors, re-render the form with error messages
        return render_template("add_contact.html", errors=errors,
           name=name, address=address,
           contact_number=contact_number, email_address=email_address)
    
    # if no errors, you can save the contact or show a success page
    return f"Contact {name} added successfully!"


if __name__ == "__main__":
    app.run(debug=True)