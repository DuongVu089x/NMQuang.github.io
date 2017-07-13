package dp_abtractFactory;

import dp_const.FactoryConst;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		FactoryProducer factoryProducer = FactoryProducer.getIntance();
		
		AbtractFactory shapeFactory = factoryProducer.getAbstractFactory(FactoryConst.SHAPE);
		Shape shape1 = shapeFactory.getShape(FactoryConst.SQUARE);
		shape1.draw();
		System.out.println("Circuit: " + shape1.calcuteCircuit());
		System.out.println("Area: " + shape1.calcuteArea());
		
		AbtractFactory colorFactory = factoryProducer.getAbstractFactory(FactoryConst.COLOR);
		Color color1 = colorFactory.getColor(FactoryConst.YELLOW);
		color1.fill();
	}

}
