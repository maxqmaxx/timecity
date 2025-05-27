<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2487.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">import express from "express";</p>
<p class="p1">const app = express();</p>
<p class="p1">app.use(express.json());</p>
<p class="p2"><br></p>
<p class="p1">const cities = ["Paris", "Tokyo", "Cairo" /* …1000+ */];</p>
<p class="p1">const active = new Map();<span class="Apple-converted-space">              </span>// callId -&gt; {count, used:Set}</p>
<p class="p2"><br></p>
<p class="p1">app.post("/api/next-city", (req, res) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const {call, message} = req.body;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const id = call.id;</p>
<p class="p1"><span class="Apple-converted-space">  </span>const state = active.get(id) ?? {count: 0, used: new Set()};</p>
<p class="p1"><span class="Apple-converted-space">  </span>state.count++;</p>
<p class="p1"><span class="Apple-converted-space">  </span>let city;</p>
<p class="p1"><span class="Apple-converted-space">  </span>do { city = cities[Math.floor(Math.random()*cities.length)] }</p>
<p class="p1"><span class="Apple-converted-space">  </span>while (state.used.has(city));</p>
<p class="p1"><span class="Apple-converted-space">  </span>state.used.add(city);</p>
<p class="p1"><span class="Apple-converted-space">  </span>active.set(id, state);</p>
<p class="p1"><span class="Apple-converted-space">  </span>res.json({</p>
<p class="p1"><span class="Apple-converted-space">    </span>results: [{</p>
<p class="p1"><span class="Apple-converted-space">      </span>toolCallId: message.toolCallList[0].id,</p>
<p class="p1"><span class="Apple-converted-space">      </span>result: `${state.count} – ${city}`</p>
<p class="p1"><span class="Apple-converted-space">    </span>}]</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">});</p>
<p class="p2"><br></p>
<p class="p1">app.listen(process.env.PORT ?? 8080, "0.0.0.0");</p>
</body>
</html>
