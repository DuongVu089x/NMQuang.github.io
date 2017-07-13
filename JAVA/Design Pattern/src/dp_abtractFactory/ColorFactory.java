package dp_abtractFactory;

import dp_const.FactoryConst;

public class ColorFactory extends AbtractFactory {

	@Override
	Shape getShape(String type) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	Color getColor(String type) {
		// TODO Auto-generated method stub
		if (type == null) {
			return null;
		} else if (type.equalsIgnoreCase(FactoryConst.YELLOW)) {
			return new Yellow();
		} else if (type.equalsIgnoreCase(FactoryConst.RED)) {
			return new Red();
		} else if (type.equalsIgnoreCase(FactoryConst.WHITE)) {
			return new White();
		}
		return null;
	}
	
}
