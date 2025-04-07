import { useState, useEffect } from "react";

export default function LolPatch() {
  const [patchData, setPatchData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm loading state

  useEffect(() => {
    const fetchVersions = async () => {
      const regions = [
        "VN2"
      ];

      try {
        const results = await Promise.all(
          regions.map(async (region) => {
            const endpoint = `https://sieve.services.riotcdn.net/api/v1/products/lol/version-sets/${region}`;

            const response = await fetch(endpoint);

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Fetch error data:", errorData);
              throw new Error(
                `Failed to fetch data for ${region}: ${response.status} ${response.statusText}`
              );
            }

            const data = await response.json();
            if (data.releases && data.releases.length > 0) {
              const compatVersionId = data.releases[0].compat_version.id;
              return {
                region: region,
                version: compatVersionId.split("+")[0],
              };
            }
            return { region: region, version: "N/A" };
          })
        );
        setPatchData(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Đặt loading thành false sau khi fetch xong
      }
    };

    fetchVersions();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Hiển thị loading khi đang tải
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>League of Legends Patch Versions</h2>
      <table>
        <thead>
          <tr>
            <th>Region</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {patchData.map((item, index) => (
            <tr key={index}>
              <td>{item.region}</td>
              <td>{item.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}