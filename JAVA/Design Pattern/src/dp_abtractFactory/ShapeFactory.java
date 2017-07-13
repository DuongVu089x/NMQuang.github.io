package dp_abtractFactory;

import dp_const.FactoryConst;

public class ShapeFactory extends AbtractFactory {
	
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

	@Override
	Color getColor(String type) {
		// TODO Auto-generated method stub
		return null;
	}
}
