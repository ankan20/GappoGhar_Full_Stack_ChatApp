class ErroHandler extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export {ErroHandler};