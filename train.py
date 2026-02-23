import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

# Load dataset
df = pd.read_csv("housing.csv")

print(df.head())

# Drop categorical column for now
df = df.drop("ocean_proximity", axis=1)

# Remove missing values
df = df.dropna()

# Split features and target
X = df.drop("median_house_value", axis=1)
y = df["median_house_value"]

# Train model
model = LinearRegression()
model.fit(X, y)

# Save model
with open("house_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully!")