var withoutAuthor = GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
  commit: {
    message: {
      displayAuthor: false,
    },
  },
});
// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

// Instantiate the graph.
const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
  template: withoutAuthor,
});

// Simulate git commands with Gitgraph API.
const master = gitgraph.branch({
  name: "master",
  style: {
    color: "green",
    label: {
      strokeColor: "green"
    }
  },
  commitDefaultOptions: {
    style: {
      color: "green",
      message: {
        color: "green"
      },
      dot: {
        color: "green"
      }
    }
  }
});
master.commit("Initial commit");

const chg1 = gitgraph.branch({
  name: "chg1",
  style: {
    color: "cornflowerblue",
    label: {
      strokeColor: "cornflowerblue"
    }
  },
  commitDefaultOptions: {
    style: {
      color: "cornflowerblue",
      message: {
        color: "cornflowerblue"
      },
      dot: {
        color: "cornflowerblue"
      }
    }
  }
});
const chg2 = gitgraph.branch({
  name: "chg2",
  style: {
    color: "purple",
    label: {
      strokeColor: "purple"
    }
  },
  commitDefaultOptions: {
    style: {
      color: "purple",
      message: {
        color: "purple"
      },
      dot: {
        color: "purple"
      }
    }
  }
});

chg1
  .commit("Add some changes")
  .commit("Make more changes")
  .commit("Almost done");

chg2
  .commit("Add some changes")
  .commit("Make more changes")
  .commit("Almost done");

master.merge(chg1).tag("PR1");
master.merge(chg2).tag("PR2");
