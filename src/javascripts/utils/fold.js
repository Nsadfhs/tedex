function foldContents(_trigger, _target) {
    const $foldingButton = document.getElementById(_trigger);
    const $foldingContents = document.getElementById(_target);
    if ($foldingButton) {
        if (sessionStorage.getItem(_trigger) == "true") {
            // console.log("접어져 있다.아니라면 접어라");
            $foldingButton.classList.add("folded");
            $foldingContents.classList.add("silence");
        } else {
            // console.log("펼쳐져 있다. 아니라면 펼쳐라")
            $foldingButton.classList.remove("folded");
            $foldingContents.classList.remove("silence");
        }

        $foldingButton.addEventListener("click", function () {
            if (this.classList.contains("folded")) {
                this.classList.remove("folded");
                $foldingContents.classList.remove("silence");
                sessionStorage.setItem(_trigger, false);
                // console.log("펼쳤다..");
            } else {
                this.classList.add("folded");
                $foldingContents.classList.add("silence");
                sessionStorage.setItem(_trigger, true);
                // console.log("접었다.")
            };
        });
    };
};