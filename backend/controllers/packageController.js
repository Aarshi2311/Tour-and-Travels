const Package = require("../models/Package");

// CREATE PACKAGE (Admin)
exports.createPackage = async (req, res) => {
  try {
    const { name, destination, price, duration, description, image, highlights } = req.body;

    if (!name || !destination || !price || !duration || !image) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newPackage = new Package({
      name,
      destination,
      price,
      duration,
      description,
      image,
      highlights: highlights || [],
    });

    await newPackage.save();

    res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error) {
    console.error("Create package error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL PACKAGES
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    console.error("Get packages error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE PACKAGE
exports.getPackageById = async (req, res) => {
  try {
    const { packageId } = req.params;
    const pkg = await Package.findById(packageId);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json(pkg);
  } catch (error) {
    console.error("Get package error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PACKAGE (Admin)
exports.updatePackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const { name, destination, price, duration, description, image, highlights } = req.body;

    const pkg = await Package.findByIdAndUpdate(
      packageId,
      {
        name,
        destination,
        price,
        duration,
        description,
        image,
        highlights,
      },
      { new: true }
    );

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({
      message: "Package updated successfully",
      package: pkg,
    });
  } catch (error) {
    console.error("Update package error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE PACKAGE (Admin)
exports.deletePackage = async (req, res) => {
  try {
    const { packageId } = req.params;
    const pkg = await Package.findByIdAndDelete(packageId);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Delete package error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
