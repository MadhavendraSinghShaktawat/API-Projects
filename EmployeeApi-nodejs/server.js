//* importing basic modules
const http = require('http');
const url = require('url');

//? Mimicing the database
const employees = [
    {id: 1, name: 'Madhav'},
    {id: 2, name: 'Harsh'},
    {id: 3, name: 'Abhay'}
]


const requestHandler = (req, res)=>{
    const {method, url} =req;
    const parts = url.split('/');
    const id = parts[2];
    console.log(parts);

    //? Route to get all employees
    if ( method === 'GET' && url === '/employees') {
        res.writeHead(200, {'Content-Tpye': 'application/json'});
        res.end(JSON.stringify(employees));
    }

    //? Route to get single employee
    else if (method === 'GET' && parts[1]==='employees' && id) {
        const employee = employees.find((emp)=>emp.id === parseInt(id));
        if(employee){
            res.writeHead(200, {'Content-Tpye': 'application/json'});
            res.end(JSON.stringify(employee));
        }else{
            res.writeHead(200, {'Content-Tpye': 'application/json'});
            res.end(JSON.stringify({message: "Employee not found"}));
        }
    }

    //? Create new employee
    else if (method === 'POST' && url === '/employees') { 
        let body = '';

        //* Listen to the event of making post request
        req.on('data', (chunk)=>{
            body += chunk;
        })
        // * Send The Response
        req.on('end', ()=>{
            const newEmployee = JSON.parse(body);
            employees.push(newEmployee);
            res.writeHead(200, {'Content-Tpye': 'application/json'});
            res.end(JSON.stringify({newEmployee, employees}));
        })

    }

};

const server = http.createServer(requestHandler);

//* Starting the server 
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
// The end