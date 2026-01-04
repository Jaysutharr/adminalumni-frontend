const http = require('http');

const getJobs = () => {
    return new Promise((resolve, reject) => {
        http.get('http://localhost:13417/api/v1/jobs', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', reject);
    });
};

const updateJobStatus = (id) => {
    const data = JSON.stringify({ Status: 'Completed' });
    const options = {
        hostname: 'localhost',
        port: 13417,
        path: `/api/v1/jobs/${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => responseData += chunk);
        res.on('end', () => console.log('Update Response:', responseData));
    });

    req.on('error', (e) => console.error('Update Error:', e));
    req.write(data);
    req.end();
};

const main = async () => {
    try {
        const result = await getJobs();
        if (result.success && result.data && result.data.length > 0) {
            const job = result.data[0];
            console.log(`Updating Job ID: ${job._id || job.id} to Completed...`);
            updateJobStatus(job._id || job.id);
        } else {
            // Create a job if none exists
            console.log("No jobs found. Please create a job via the UI first.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
