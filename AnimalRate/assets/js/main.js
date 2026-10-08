$(document).ready(function() {
	var bannerHeadingH2 = $(".banner_heading h2"),
		bannerHeadingH3 = $(".banner_heading h3");

	if (bannerHeadingH2.length && bannerHeadingH3.length) {
		TweenMax.fromTo(bannerHeadingH2, 0.8, {
			y: 24,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			ease: Power3.easeOut
		});

		TweenMax.fromTo(bannerHeadingH3, 0.8, {
			y: 24,
			autoAlpha: 0
		}, {
			y: 0,
			autoAlpha: 1,
			delay: 0.18,
			ease: Power3.easeOut
		});
	}
});
