package dp_abtractFactory;

public class Square implements Shape{
	
	public float a;
	
	
	public Square(float a) {
		super();
		this.a = a;
	}

	public void draw() {
		System.out.println("Draw of square");
	}

	@Override
	public float calcuteCircuit() {
		// TODO Auto-generated method stub
		if (a > 0) {
			return a * 4;
		}
		return 0;
	}

	@Override
	public float calcuteArea() {
		// TODO Auto-generated method stub
		if (a > 0) {
			return a * a;
		}
		return 0;
	}
}
