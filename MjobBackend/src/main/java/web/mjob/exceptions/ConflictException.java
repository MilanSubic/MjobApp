package web.mjob.exceptions;

public class ConflictException extends Exception {
    public ConflictException() {

    }
    public ConflictException(String message){
        super(message);
    }
}
