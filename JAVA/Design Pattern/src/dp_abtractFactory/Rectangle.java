package dp_abtractFactory;

public class Rectangle implements Shape {

	public float length;
	public float width;
	
	
	public Rectangle(float length, float width) {
		super();
		this.length = length;
		this.width = width;
	}

	public void draw() {
		System.out.println("Draw of rectangle");
	}

	@Override
	public float calcuteCircuit() {
		// TODO Auto-generated method stub
		if (length > 0 && width > 0) {
			return (length + width) * 2;
		}
		return 0;
	}

	@Override
	public float calcuteArea() {
		// TODO Auto-generated method stub
		if (length > 0 && width > 0) {
			return length * width;
		}
		return 0;
	}

}
