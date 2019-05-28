<a name="module_lws"></a>

## lws

* [lws](#module_lws)
    * [Lws](#exp_module_lws--Lws) ⏏
        * [.listen([options])](#module_lws--Lws+listen) ⇒ <code>Server</code>
        * [.getDefaults()](#module_lws--Lws+getDefaults) ⇒ <code>object</code>
        * [.mergeOptions(options)](#module_lws--Lws+mergeOptions) ⇒ <code>object</code>
        * [.createServer([options])](#module_lws--Lws+createServer) ⇒ <code>Server</code>
        * [.attachMiddleware([options])](#module_lws--Lws+attachMiddleware)
        * [.getRequestHandler(middlewares)](#module_lws--Lws+getRequestHandler) ⇒ <code>function</code>
        * [.getMiddlewareStack([options])](#module_lws--Lws+getMiddlewareStack) ⇒ <code>function</code>

<a name="exp_module_lws--Lws"></a>

### Lws ⏏
**Kind**: Exported class  
**Emits**: <code>event:verbose</code>  
<a name="module_lws--Lws+listen"></a>

#### lws.listen([options]) ⇒ <code>Server</code>
Returns a listening HTTP/HTTPS/HTTP2 server.

**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Server options |
| [options.port] | <code>number</code> | Port |
| [options.hostname] | <code>string</code> | The hostname (or IP address) to listen on. Defaults to 0.0.0.0. |
| [options.maxConnections] | <code>number</code> | The maximum number of concurrent connections supported by the server. |
| [options.keepAliveTimeout] | <code>number</code> | The period (in milliseconds) of inactivity a connection will remain open before being destroyed. Set to `0` to keep connections open indefinitely. |
| [options.configFile] | <code>string</code> | Config file path, defaults to 'lws.config.js'. |
| [options.https] | <code>boolean</code> | Enable HTTPS using a built-in key and cert registered to the domain 127.0.0.1. |
| [options.key] | <code>string</code> | SSL key file path. Supply along with --cert to launch a https server. |
| [options.cert] | <code>string</code> | SSL cert file path. Supply along with --key to launch a https server. |
| [options.pfx] | <code>string</code> | Path to an PFX or PKCS12 encoded private key and certificate chain. An alternative to providing --key and --cert. |
| [options.ciphers] | <code>string</code> | Optional cipher suite specification, replacing the default. |
| [options.secureProtocol] | <code>string</code> | Optional SSL method to use, default is "SSLv23_method". |
| [options.stack] | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Middlewares&gt;</code> | Array of middleware classes, or filenames of modules exporting a middleware class. |
| [options.moduleDir] | <code>Array.&lt;string&gt;</code> | One or more directories to search for middleware modules. |
| [options.modulePrefix] | <code>string</code> | An optional string to prefix to module names when loading middleware modules Defaults to 'lws-'. |

<a name="module_lws--Lws+getDefaults"></a>

#### lws.getDefaults() ⇒ <code>object</code>
Get built-in defaults.

**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  
<a name="module_lws--Lws+mergeOptions"></a>

#### lws.mergeOptions(options) ⇒ <code>object</code>
Merge options with defaults and stored config.

**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  

| Param | Type |
| --- | --- |
| options | <code>object</code> | 

<a name="module_lws--Lws+createServer"></a>

#### lws.createServer([options]) ⇒ <code>Server</code>
Returns a HTTP, HTTPS or HTTP2 server instance.

**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Server options |
| [options.maxConnections] | <code>number</code> | The maximum number of concurrent connections supported by the server. |
| [options.keepAliveTimeout] | <code>number</code> | The period (in milliseconds) of inactivity a connection will remain open before being destroyed. Set to `0` to keep connections open indefinitely. |
| [options.https] | <code>boolean</code> | Enable HTTPS using a built-in key and cert registered to the domain 127.0.0.1. |
| [options.key] | <code>string</code> | SSL key file path. Supply along with --cert to launch a https server. |
| [options.cert] | <code>string</code> | SSL cert file path. Supply along with --key to launch a https server. |
| [options.pfx] | <code>string</code> | Path to an PFX or PKCS12 encoded private key and certificate chain. An alternative to providing --key and --cert. |
| [options.ciphers] | <code>string</code> | Optional cipher suite specification, replacing the default. |
| [options.secureProtocol] | <code>string</code> | Optional SSL method to use, default is "SSLv23_method". |

<a name="module_lws--Lws+attachMiddleware"></a>

#### lws.attachMiddleware([options])
Attach a Middleware stack to a running server.

**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | These options plus any arbitrary options you want to expose to the middleware plugins. |
| [options.stack] | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Middlewares&gt;</code> | Array of middleware classes, or filenames of modules exporting a middleware class. |
| [options.moduleDir] | <code>Array.&lt;string&gt;</code> | One or more directories to search for middleware modules. |
| [options.modulePrefix] | <code>string</code> | An optional string to prefix to module names when loading middleware modules Defaults to 'lws-'. |

<a name="module_lws--Lws+getRequestHandler"></a>

#### lws.getRequestHandler(middlewares) ⇒ <code>function</code>
**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  

| Param | Type |
| --- | --- |
| middlewares | <code>Array.&lt;function()&gt;</code> | 

<a name="module_lws--Lws+getMiddlewareStack"></a>

#### lws.getMiddlewareStack([options]) ⇒ <code>function</code>
**Kind**: instance method of [<code>Lws</code>](#exp_module_lws--Lws)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> | Options. |
| [options.stack] | <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Middlewares&gt;</code> | Array of middleware classes, or filenames of modules exporting a middleware class. |
| [options.moduleDir] | <code>Array.&lt;string&gt;</code> | One or more directories to search for middleware modules. |
| [options.modulePrefix] | <code>string</code> | An optional string to prefix to module names when loading middleware modules Defaults to 'lws-'. |

