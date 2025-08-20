<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
    
    // DEBUG: Output
    echo "Name: " . $name . "<br>";
    echo "Email: " . $email . "<br>";
    echo "Age: " . $age . "<br>";
    echo "Password: " . $password . "<br>";
    echo "Confirm Password: " . $confirmPassword . "<br>";
    echo "Year Level: " . $yearLevel . "<br>";
    echo "Preferred Learning Modality: " . $preferredLearningModality . "<br>";
    echo "Satisfaction: " . $satisfaction . "<br>";
    echo "Additional Comments: " . $additionalComments . "<br>";
?>