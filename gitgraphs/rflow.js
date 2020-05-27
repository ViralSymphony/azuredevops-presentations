var withoutAuthor = GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
  commit: {
    message: {
      displayAuthor: false,
    },
  },
});
// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

var branchesOrder = ['master','chg1','chg2','h1','r1'];
var compareBranchesOrder = function(a, b) {
  return branchesOrder.indexOf(a) - branchesOrder.indexOf(b);
};

// Instantiate the graph.
const gitgraph = GitgraphJS.createGitgraph(graphContainer, {
  template: withoutAuthor,
  compareBranchesOrder: compareBranchesOrder
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

const r1 = gitgraph.branch({
  name: "r1",
  style: {
    color: "goldenrod",
    label: {
      strokeColor: "goldenrod"
    }
  },
  commitDefaultOptions: {
    style: {
      color: "goldenrod",
      message: {
        color: "goldenrod"
      },
      dot: {
        color: "goldenrod"
      }
    }
  }}).commit("Init for release");

const h1 = master.branch({
  name: "h1",
  style: {
    color: "#ff0000",
    label: {
      strokeColor: "#ff0000"
    }
  },
  commitDefaultOptions: {
    style: {
      color: "#ff0000",
      message: {
        color: "#ff0000"
      },
      dot: {
        color: "#ff0000"
      }
    }
  }
}).commit("Hotfix");


master.merge(h1).tag("PR3");
r1.merge(h1);
