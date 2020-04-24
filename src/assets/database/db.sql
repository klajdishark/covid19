CREATE TABLE IF NOT EXISTS locations(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat NUMERIC,
    lng NUMERIC,
    time INTEGER
);

-- INSERT into locations (lat, lng, time) VALUES (1, 1, 1);
