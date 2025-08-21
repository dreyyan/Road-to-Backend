<?php
// Handle Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // MySQL Setup
    $servername = "localhost";
    $username = "root";
    $password = "123098239838";
    $database = "student_survey";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    echo "Connected successfully!";

    // FUNCTIONS
    function validateField($regex, $field, $fieldName) {
        if (!preg_match($regex, $field)) {
            echo "ERROR: Invalid " . $fieldName . "<br>";
        }
    }

    // Get variables
    $name = htmlspecialchars($_POST["name_input"]);
    $email = htmlspecialchars($_POST["email_input"]);
    $age = htmlspecialchars($_POST["age_input"]);
    $password = htmlspecialchars($_POST["password_input"]);
    $confirmPassword = htmlspecialchars($_POST["confirm_password_input"]);
    $yearLevel = htmlspecialchars($_POST["year_level_input"]);
    $preferredLearningModality = htmlspecialchars($_POST["preferred_learning_modality_input"]);
    $satisfaction = htmlspecialchars($_POST["satisfaction_input"]);
    $additionalComments = htmlspecialchars($_POST["additional_comments_input"]);

    // Validate field
    validateField("/^[a-zA-Z\s]+$/", $name, "Name"); // letters + spaces
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "ERROR: Invalid Email<br>";
        }
    }

    validateField("/^[0-9]+$/", $age, "Age"); // numbers only
    validateField("/^.{6,}$/", $password, "Password"); // at least 6 chars
    if ($password !== $confirmPassword) {
        echo "ERROR: Passwords do not match<br>";
    }
   
    // Hash password for security
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL (prevent SQL injection)
    $stmt = $conn->prepare("INSERT INTO responses 
        (name, email, age, password, year_level, preferred_learning_modality, satisfaction, additional_comments) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("ssisssss", $name, $email, $age, $hashedPassword, $yearLevel, $preferredLearningModality, $satisfaction, $additionalComments);

    if ($stmt->execute()) {
        echo "New record created successfully!";
    } else {
        echo "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
    // DEBUG: Output
    // echo "Name: " . $name . "<br>";
    // echo "Email: " . $email . "<br>";
    // echo "Age: " . $age . "<br>";
    // echo "Password: " . $password . "<br>";
    // echo "Confirm Password: " . $confirmPassword . "<br>";
    // echo "Year Level: " . $yearLevel . "<br>";
    // echo "Preferred Learning Modality: " . $preferredLearningModality . "<br>";
    // echo "Satisfaction: " . $satisfaction . "<br>";
    // echo "Additional Comments: " . $additionalComments . "<br>";
?>