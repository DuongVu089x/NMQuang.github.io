package dp_factory;

public class FactoryMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ShapeFactory shapeFactory = new ShapeFactory();
		
		Shape shape1 = shapeFactory.getShape("Rectangle");
		shape1.draw();
		System.out.println("Circuit: " + shape1.calcuteCircuit());
		System.out.println("Area: " + shape1.calcuteArea());
	}

}
