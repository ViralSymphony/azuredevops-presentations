var withoutAuthor = GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
  commit: {
    message: {
      displayAuthor: false,
    },
  },
});
// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

var branchesOrder = ['master','dev','r1','chg1','chg2'];
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

const dev = gitgraph.branch({
  name: "dev",
  style: {
    color: "mediumvioletred",
    label: {
      strokeColor: "mediumvioletred"
    }
  },
  commitDefaultOptions: {
    style: {
      color: "mediumvioletred",
      message: {
        color: "mediumvioletred"
      },
      dot: {
        color: "mediumvioletred"
      }
    }
  }
}).commit("Init dev");

const chg1 = dev.branch({
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
const chg2 = dev.branch({
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

dev.merge(chg1).tag("PR1");
dev.merge(chg2).tag("PR2");

const r1 = dev.branch({
  name: 'r1',
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
  }
}).commit("Init for release").commit("Bugfix");

dev.merge(r1);
master.merge(r1).tag("PR3").tag("v1.0");
