<template>
  <main>
    <h1 class="title">Statistics</h1>
    <h2 class="subtitle">These are your statistics in the application:</h2>
    <section>
      <table class="table">
        <head>
          <th class="text">Puntuation</th>
          <th class="text">Number of comments</th>
          <th class="text">Percentatge</th>
        </head>
        <tmain>
          <tr>
            <td class="text">{{ avg_score }}</td>
            <td class="text">{{ num_comments }}</td>
            <td class="text">{{ percentatge }}</td>
          </tr>
        </tmain>
      </table>
    </section>
  </main>
</template>

<script>
export default {
  Name: "Stats",
};
</script>

<style scoped>
main {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.title {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 40px;
  margin-left: 60px;
}

.subtitle {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
}

.text {
  color: #eee;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
}

.table {
  margin-top: 20px;
  margin-left: 40px;
}
</style>
