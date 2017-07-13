package dp_abtractFactory;

public abstract class AbtractFactory {

	abstract Shape getShape(String type);	
	abstract Color getColor(String type);
}
