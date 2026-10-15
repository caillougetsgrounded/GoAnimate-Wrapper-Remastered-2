const env = Object.assign(process.env,
	require('./env'),
	require('./config'));

const http = require('http');
const pmc = require('./character/premade');
const chl = require('./character/load');
const chs = require('./character/save');
const asu = require('./asset/upload');
const stl = require('./static/load');
const stp = require('./static/page');
const asl = require('./asset/load');
const asL = require('./asset/list');
const ast = require('./asset/thmb');
const mvl = require('./movie/load');
const mvL = require('./movie/list');
const mvm = require('./movie/meta');
const mvs = require('./movie/save');
const mvt = require('./movie/thmb');
const thL = require('./theme/list');
const thl = require('./theme/load');
const tsv = require('./tts/voices');
const tsl = require('./tts/load');
const evt = require('./events');
const url = require('url');

const functions = [
	mvL,
	pmc,
	asl,
	evt,
	chl,
	thl,
	thL,
	chs,
	asL,
	tsl,
	ast,
	mvm,
	mvl,
	mvs,
	mvt,
	tsv,
	asu,
	stp,
	stl,
];

module.exports = http.createServer((req, res) => {
    try {
        const parsedUrl = { pathname: req.url.split('?') };
        const found = functions.find(req, res, parsedUrl);
        if (!found) { 
            res.statusCode = 404;
            res.end("Not Found");
        }
    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Application Error</title><style>body { background-color: #f7f8fb; color: #3f4652; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; text-align: center; padding: 0; margin: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 100vh; } .container { max-width: 600px; padding: 20px; margin-bottom: 80px; } .icon { width: 70px; height: 70px; background-color: #cbd2db; margin: 0 auto 30px auto; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); opacity: 0.7; } h1 { font-size: 34px; font-weight: 300; line-height: 1.2; margin-bottom: 20px; color: #7a828e; } p { font-size: 17px; color: #7a828e; line-height: 1.6; margin-bottom: 15px; } a { color: #2b6cb0; text-decoration: none; } a:hover { text-decoration: underline; } code { background-color: #2d3748; color: #e2e8f0; font-family: monospace; padding: 6px 14px; border-radius: 4px; display: inline-block; margin-top: 10px; font-size: 16px; letter-spacing: 0.5px; } .footer { position: absolute; bottom: 0; left: 0; width: 100%; border-top: 1px solid #e2e8f0; background-color: #ffffff; padding: 15px 25px; display: flex; align-items: center; box-sizing: border-box; } .footer-logo { display: flex; align-items: center; font-weight: 800; font-size: 13px; letter-spacing: 1.5px; color: #9aa3af; text-transform: uppercase; } .footer-logo svg { margin-right: 8px; fill: #9aa3af; }</style></head><body><div class="container"><div class="icon"></div><h1>Application error</h1><p>An error occurred in the application and your page could not be served. If you are the application owner, <a href="https://render.com" target="_blank">check your logs for details</a>. You can do this from the Render Dashboard or using the Render CLI command:</p><code>render logs</code></div><div class="footer"><div class="footer-logo"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/></svg>Render</div></div></body></html>`);
    }
}).listen(process.env.PORT || 3000);
