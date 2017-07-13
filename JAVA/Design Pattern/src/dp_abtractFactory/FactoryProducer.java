package dp_abtractFactory;

import dp_const.FactoryConst;

public class FactoryProducer {

	private static FactoryProducer factoryProducer;
	private FactoryProducer() {}
	
	public static FactoryProducer getIntance() {
		if (factoryProducer == null) {
			factoryProducer = new FactoryProducer();
		}
		return factoryProducer;
	}
	
	public AbtractFactory getAbstractFactory(String choice) {
		
		if (choice.equalsIgnoreCase(FactoryConst.SHAPE)) {
			return new ShapeFactory();
		} else if (choice.equalsIgnoreCase(FactoryConst.COLOR)) {
			return new ColorFactory();
		}
		
		return null;
	}
}
