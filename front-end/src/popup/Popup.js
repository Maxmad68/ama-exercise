import './Popup.css';
import React, { useState, useEffect } from 'react';

/**
 * Popup component for creating or editing a recipe.
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onValid - Callback function called on successful form submission.
 * @param {Function} props.onCancel - Callback function called when the form is canceled.
 * @param {Object} props.initialValues - Initial values to populate the form fields (for editing).
 * @returns {JSX.Element} The rendered Popup component.
 */
function Popup({ onValid, onCancel, initialValues }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instruction, setInstruction] = useState('');

    // Use useEffect to update the fields when initialValues change
    useEffect(() => {
        if (initialValues) {
            setName(initialValues.name || '');
            setDescription(initialValues.description || '');
            setIngredients(initialValues.ingredients || '');
            setInstruction(initialValues.instruction || '');
        }
    }, [initialValues]);

    /**
     * Handles the submission of the form.
     * @param {Object} e - The form submission event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name,
            description,
            ingredients,
            instruction,
        };

        onValid(formData);
    };

    /**
     * Handles the cancellation of the form.
     */
    const handleCancel = () => {
        setName('');
        setDescription('');
        setIngredients('');
        setInstruction('');

        onCancel();
    };

    return (
        <div className="container">
            <h1>Recipe Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Recipe Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients (comma-separated)</label>
                    <input
                        type="text"
                        id="ingredients"
                        name="ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="instruction">Instructions</label>
                    <textarea
                        id="instruction"
                        name="instruction"
                        rows="4"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
                <button type="button" id="cancel" onClick={handleCancel}>Cancel</button>
            </form>
        </div>
    );
}

export default Popup;
