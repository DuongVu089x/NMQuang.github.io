package dp_factory;

import dp_const.FactoryConst;

public class Circle implements Shape {
	
	public float radius;
	
	public Circle(float radius) {
		super();
		this.radius = radius;
	}

	public void draw() {
		System.out.println("Draw of circle");
	}

	@Override
	public float calcuteCircuit() {
		// TODO Auto-generated method stub
		if (radius > 0) {
			return radius * 2 * FactoryConst.PI;
		}
		return 0;
	}

	@Override
	public float calcuteArea() {
		// TODO Auto-generated method stub
		if (radius > 0) {
			return FactoryConst.PI * radius * radius;
		}
		return 0;
	}
}
