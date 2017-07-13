package dp_factory;

import dp_const.FactoryConst;

public class ShapeFactory {
	
	public Shape getShape(String typeShape) {
		if (typeShape == null) {
			return null;
		} else if (typeShape.equalsIgnoreCase(FactoryConst.RECTANGLE)) {
			return new Rectangle(3,4);
		} else if (typeShape.equalsIgnoreCase(FactoryConst.SQUARE)) {
			return new Square(4);
		} else if (typeShape.equalsIgnoreCase(FactoryConst.CIRCLE)) {
			return new Circle(4);
		}
		return null;
	}
}
