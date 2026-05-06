class Email {
    private readonly value: string;

    constructor(value: string) {
        // Simple validation for demonstration
        if (!value.includes('@')) {
            throw new Error('Invalid email address');
        }
        this.value = value;
    }

    getValue() {
        return this.value;
    }
}