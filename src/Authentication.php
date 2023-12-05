<?php
class Authentication {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function login($username, $password) {
        $query = "SELECT * FROM users WHERE username = :username AND password = :password";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function signup($username, $password) {
        $query = "INSERT INTO users (username, password) VALUES (:username, :password)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);

        return $stmt->execute();
    }
}
?>
