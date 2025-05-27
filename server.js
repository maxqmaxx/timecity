import express from "express";
import cors from "cors";

const app = express();
app.use(cors());            //  ← adds ‘Access-Control-Allow-Origin: *’
app.use(express.json());


const cities = ["Paris", "Tokyo", "Cairo"];
const active = new Map();


app.post("/api/next-city", (req, res) => {
  const { call, message } = req.body;
  const id = call.id;
  const state = active.get(id) ?? { count: 0, used: new Set() };
  state.count++;
  let city;
  do { city = cities[Math.floor(Math.random() * cities.length)]; }
  while (state.used.has(city));
  state.used.add(city);
  active.set(id, state);

  res.json({
    results: [{
      toolCallId: message.toolCallList[0].id,
      result: `${state.count} – ${city}`
    }]
  });
});

app.listen(process.env.PORT ?? 8080, "0.0.0.0", () =>
  console.log("✅ webhook listening on port", process.env.PORT ?? 8080)
);