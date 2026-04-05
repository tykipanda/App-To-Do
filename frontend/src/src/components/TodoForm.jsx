import React, { useState } from "react";

function TodoForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim(), description.trim());
            setTitle("");
            setDescription("");
        }
    };
}