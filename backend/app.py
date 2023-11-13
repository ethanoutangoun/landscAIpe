from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)

def convert_to_black_and_white(input_image_bytes):
    # Convert the image to black and white
    image = Image.open(io.BytesIO(input_image_bytes))
    image_bw = image.convert("L")

    # Save the black and white image to bytes
    output_image_bytes = io.BytesIO()
    image_bw.save(output_image_bytes, format="JPEG")
    return output_image_bytes.getvalue()

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)



@app.route('/api/process', methods=['POST'])
def process_image():
    try:
        
        # Get the image file from the POST request
        image_file = request.files['image']
       
        # Read the image file as bytes
        image_bytes = image_file.read()
        
        # Convert the image to black and white
        output_image_bytes = convert_to_black_and_white(image_bytes)

        # # Save the black and white image to a file
        output_path = "output.jpg"
        with open(output_path, 'wb') as f:
            f.write(output_image_bytes)

        print(f"Image saved to {output_path}")


        # Encode the black and white image data as base64
        base64_output = base64.b64encode(output_image_bytes).decode('utf-8')

        # Return the base64-encoded black and white image in the response
        return jsonify({'image': base64_output})


    except Exception as e:
        print(e)
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=8080)
