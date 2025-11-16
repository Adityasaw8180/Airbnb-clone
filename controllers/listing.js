const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
};

module.exports.show = async (req, res) => {
    const { id } = req.params;

    const list = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" }
        })
        .populate("owner");
    if (!list) {
        req.flash("error", "Listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });
};

module.exports.create =async (req, res) => {
    const newListing = new Listing(req.body.Listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Created a new listing!');
    //console.log(newListing);
    res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash('error', 'listing does not exist!');
        return res.redirect('/listings');
    }
    res.render("listings/edit.ejs", { list });
};

module.exports.update = async (req, res) => {
    const { id } = req.params;

    let list = await Listing.findById(id);
    if (!list) {
        req.flash('error', 'Listing does not exist!');
        return res.redirect('/listings');
    }

    // Update basic fields
    list.title = req.body.Listing.title;
    list.description = req.body.Listing.description;
    list.price = req.body.Listing.price;
    list.location = req.body.Listing.location;
    list.country = req.body.Listing.country;

    // If a new image is uploaded
    if (req.file) {
        list.image.url = req.file.path;
        list.image.filename = req.file.filename;
    }

    await list.save();
    req.flash('success', 'Updated listing!');
    res.redirect(`/listings/${id}`);
};


module.exports.delete = async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash('error', 'listing does not exist!');
        return res.redirect('/listings');
    }
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'listing Deleted!');
    res.redirect("/listings");
};