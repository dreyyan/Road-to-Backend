from flask import Flask, render_template, request

app = Flask(__name__)

# route for homepage
@app.route("/")
def home():
    return render_template("index.html")  # Flask looks inside /templates/

# handle form submission
@app.route("/process_form", methods=["POST"])
def process_form():
    # get form inputs
    name = request.form.get("name_input")
    email = request.form.get("email_input")
    age = request.form.get("age_input")
    password = request.form.get("password_input")
    confirm_password = request.form.get("confirm_password_input")
    year_level = request.form.get("year_level_input")
    modality = request.form.get("preferred_learning_modality_input")
    satisfaction = request.form.get("satisfaction_input")
    comments = request.form.get("additional_comments_input")

    # just return the data back for now (you could save to DB later)
    return f"""
    <h2>Form Submitted!</h2>
    <p><b>Name:</b> {name}</p>
    <p><b>Email:</b> {email}</p>
    <p><b>Age:</b> {age}</p>
    <p><b>Year Level:</b> {year_level}</p>
    <p><b>Preferred Modality:</b> {modality}</p>
    <p><b>Satisfaction:</b> {satisfaction}</p>
    <p><b>Comments:</b> {comments}</p>
    """

if __name__ == "__main__":
    app.run(debug=True)