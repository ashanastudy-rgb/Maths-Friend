import json
import random
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        questions = []
        for _ in range(10):
            # Generate random numbers for multiplication
            # Easier tables for kids: mostly 1-10, sometimes 11-15
            num1 = random.randint(2, 12)
            num2 = random.randint(1, 10)
            
            correct_answer = num1 * num2
            
            # Generate 3 plausible distractors
            options = {correct_answer}
            while len(options) < 4:
                # Distractors could be off by 1 in multipliers, or simple addition mistakes
                err_type = random.choice([1, 2, 3])
                if err_type == 1:
                    distractor = (num1 + random.choice([-1, 1])) * num2
                elif err_type == 2:
                    distractor = num1 * (num2 + random.choice([-1, 1]))
                else:
                    distractor = correct_answer + random.choice([-10, -5, 5, 10, -1, 1])
                
                # Ensure distractor is positive and not correct
                if distractor > 0 and distractor != correct_answer:
                    options.add(distractor)
            
            options_list = list(options)
            random.shuffle(options_list)
            
            questions.append({
                "question": f"{num1} × {num2} = ?",
                "options": options_list,
                "answer": correct_answer
            })

        response = {
            "questions": questions
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
        return
